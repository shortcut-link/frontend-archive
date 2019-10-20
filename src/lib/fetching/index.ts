import { createStore, createEvent, Store, Event, Effect } from 'effector';

type Status = 'initial' | 'loading' | 'done' | 'fail';

interface Params<R, E, Rs> {
  result?: R;
  error?: E;
  reset?: Event<Rs>;
}

interface Fetching<R, E> {
  result: Store<R>;
  error: Store<E>;
  status: Store<Status>;
  isDone: Store<boolean>;
  isFailed: Store<boolean>;
  isLoading: Store<boolean>;
}

export function createFetching<Pr, Result, Error, Reset>(
  effect: Effect<Pr, Result, Error>,
  initialStatus: Status = 'initial',
  params: Params<Result, Error, Reset> = {}
): Fetching<Result, Error> {
  const customReset = params.reset || createEvent();

  const result = createStore<Result>(params.result || null)
    .reset(effect)
    .reset(effect.fail)
    .reset(customReset)
    .on(effect.done, (_, { result: value }) => value);

  const error = createStore<Error>(params.error || null)
    .reset(effect)
    .reset(effect.done)
    .reset(customReset)
    .on(effect.fail, (_, { error: value }) => value);

  const status = createStore<Status>(initialStatus)
    .on(effect, () => 'loading')
    .on(effect.done, () => 'done')
    .on(effect.fail, () => 'fail')
    .on(customReset, () => 'initial');

  const isDone = status.map<boolean>(state => state === 'done');
  const isFailed = status.map<boolean>(state => state === 'fail');
  const isLoading = status.map<boolean>(state => state === 'loading');

  return { result, error, status, isDone, isFailed, isLoading };
}
