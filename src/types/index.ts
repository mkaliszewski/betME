interface Race {
  active: boolean;
  id: number;
  name: string;
  participants: number[];
}

interface Participant {
  id: number;
  body: string;
}

enum Places {
  First = 'first',
  Second = 'second',
  Third = 'third'
}

enum Status {
  Any = 'Any',
  Active = 'Active',
  Inactive = 'Inactive'
}

type Bets = Record<Places, number | null>;

export type { Race, Participant, Bets };
export { Places, Status };
