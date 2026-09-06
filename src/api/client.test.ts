/**
 * Phase 4G — Unit tests for the typed API client.
 * Uses a global fetch mock (no backend required).
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { apiGet, apiPost, apiPut } from './client';
import { ApiRequestError } from './errors';

const ok = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

afterEach(() => { vi.restoreAllMocks(); });

describe('apiGet — query string encoding', () => {
  it('omits query string when params are undefined', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(ok({}));
    await apiGet('/locations');
    const url = spy.mock.calls[0][0] as URL;
    expect(url.search).toBe('');
  });

  it('encodes the search query', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(ok({}));
    await apiGet('/locations', { query: 'noida' });
    const url = spy.mock.calls[0][0] as URL;
    expect(url.searchParams.get('query')).toBe('noida');
  });

  it('encodes snake_case location_id', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(ok({}));
    await apiGet('/weather/current', { location_id: 'delhi-ncr' });
    const url = spy.mock.calls[0][0] as URL;
    expect(url.searchParams.get('location_id')).toBe('delhi-ncr');
  });

  it('drops null and undefined values', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(ok({}));
    await apiGet('/x', { a: 1, b: null, c: undefined });
    const url = spy.mock.calls[0][0] as URL;
    expect(url.searchParams.get('a')).toBe('1');
    expect(url.searchParams.has('b')).toBe(false);
    expect(url.searchParams.has('c')).toBe(false);
  });

  it('stringifies numbers and booleans', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(ok({}));
    await apiGet('/x', { hours: 12, days: 7, verbose: true });
    const url = spy.mock.calls[0][0] as URL;
    expect(url.searchParams.get('hours')).toBe('12');
    expect(url.searchParams.get('days')).toBe('7');
    expect(url.searchParams.get('verbose')).toBe('true');
  });
});

describe('apiPost — JSON body encoding', () => {
  it('sends POST with application/json and JSON body', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(ok({ matchedIntent: 'greet' }));
    await apiPost('/vayron/context', { userInput: 'hi', interest: 'commute' });
    const [_, opts] = spy.mock.calls[0] as [URL, RequestInit];
    expect(opts.method).toBe('POST');
    expect((opts.headers as Record<string, string>)['Content-Type']).toBe('application/json');
    const body = JSON.parse(opts.body as string);
    expect(body.userInput).toBe('hi');
    expect(body.interest).toBe('commute');
  });
});

describe('apiPut — JSON body encoding', () => {
  it('sends PUT with application/json and JSON body', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(ok({ selectedInterest: 'fitness' }));
    await apiPut('/profile', { selectedInterest: 'fitness' });
    const [_, opts] = spy.mock.calls[0] as [URL, RequestInit];
    expect(opts.method).toBe('PUT');
    const body = JSON.parse(opts.body as string);
    expect(body.selectedInterest).toBe('fitness');
  });
});

describe('ApiRequestError — typed error parsing', () => {
  it('throws ApiRequestError(422, INVALID_INTEREST) with valid_interests', async () => {
    const factory = () => ok({
      detail: { error: 'Invalid interest "unicorn"', code: 'INVALID_INTEREST', valid_interests: ['commute', 'fitness'] },
    }, 422);
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => Promise.resolve(factory()));
    const err = await apiGet('/personalized/home', { interest: 'unicorn' }).catch(e => e);
    expect(err).toBeInstanceOf(ApiRequestError);
    expect(err).toMatchObject({
      status: 422,
      code: 'INVALID_INTEREST',
      valid_interests: ['commute', 'fitness'],
    });
  });

  it('throws ApiRequestError(404, LOCATION_NOT_FOUND)', async () => {
    const factory = () => ok({
      detail: { error: "Location 'atlantis' not found.", code: 'LOCATION_NOT_FOUND' },
    }, 404);
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => Promise.resolve(factory()));
    const err = await apiGet('/weather/current', { location_id: 'atlantis' }).catch(e => e);
    expect(err).toBeInstanceOf(ApiRequestError);
    expect(err).toMatchObject({
      status: 404,
      code: 'LOCATION_NOT_FOUND',
    });
  });

  it('throws ApiRequestError(500, STORAGE_ERROR)', async () => {
    const factory = () => ok({
      detail: { error: 'Storage failure', code: 'STORAGE_ERROR' },
    }, 500);
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => Promise.resolve(factory()));
    const err = await apiPut('/profile', { selectedInterest: null }).catch(e => e);
    expect(err).toBeInstanceOf(ApiRequestError);
    expect(err).toMatchObject({
      status: 500,
      code: 'STORAGE_ERROR',
    });
  });
});

describe('AbortSignal — cancellation', () => {
  it('passes AbortSignal through to fetch', async () => {
    let received: AbortSignal | null = null;
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (_url, opts) => {
      received = (opts as RequestInit).signal as AbortSignal;
      return ok({});
    });
    const ctrl = new AbortController();
    await apiGet('/weather/current', { location_id: 'delhi-ncr' }, ctrl.signal);
    expect(received).toBe(ctrl.signal);
  });

  it('pre-aborted signal causes AbortError to propagate', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
      const e = new Error('aborted');
      e.name = 'AbortError';
      return Promise.reject(e);
    });
    const ctrl = new AbortController();
    ctrl.abort();
    await expect(apiGet('/weather/current', { location_id: 'delhi-ncr' }, ctrl.signal))
      .rejects.toMatchObject({ name: 'AbortError' });
  });
});

describe('camelCase response preservation', () => {
  it('preserves CurrentWeather camelCase fields', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(ok({
      locationId: 'delhi-ncr', temp: 31, feelsLike: 34, condition: 'partly-cloudy',
      description: 'Partly Cloudy', humidity: 72, windSpeed: 14, pressure: 1008,
      visibility: 8, uvIndex: 6, sunrise: '5:42 AM', sunset: '7:14 PM',
    }));
    const r = await apiGet<{ feelsLike: number; windSpeed: number; uvIndex: number }>(
      '/weather/current', { location_id: 'delhi-ncr' },
    );
    expect(r.feelsLike).toBe(34);
    expect(r.windSpeed).toBe(14);
    expect(r.uvIndex).toBe(6);
  });

  it('preserves PersonalizedHome hourlyForecast/weeklyForecast camelCase aliases', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(ok({
      location: { id: 'delhi-ncr', name: 'New Delhi' },
      current: { temp: 31, feelsLike: 34, condition: 'sunny' },
      hourlyForecast: [{ time: 'Now', temp: 31 }],
      weeklyForecast: [{ day: 'Today', precipChance: 20 }],
      alerts: [], insights: [], utilities: [], recommendations: [],
      interest: { id: 'commute' },
    }));
    const r = await apiGet<{
      hourlyForecast: unknown[];
      weeklyForecast: Array<{ precipChance: number }>;
    }>('/personalized/home', { location_id: 'delhi-ncr', interest: 'commute' });
    expect(Array.isArray(r.hourlyForecast)).toBe(true);
    expect(Array.isArray(r.weeklyForecast)).toBe(true);
    expect(r.weeklyForecast[0].precipChance).toBe(20);
  });
});
