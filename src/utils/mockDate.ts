const mockDateValue = '2026-03-24T08:59:55';

export function mockDate() {
  const originalNow = Date.now;
  const initialMockDate = new Date(mockDateValue);
  const initialNow = Date.now();

  // eslint-disable-next-line no-global-assign
  Date = class extends Date {
    constructor(args: ConstructorParameters<DateConstructor> | undefined) {
      if (!args) {
        const diff = originalNow() - initialNow;
        super(initialMockDate.getTime() + diff);
      } else {
        super(...args);
      }
    }

    static now() {
      const diff = originalNow() - initialNow;
      return initialMockDate.getTime() + diff;
    }
  } as unknown as typeof Date;
}
