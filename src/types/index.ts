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

interface RaceWithParticipants {
  race: Race;
  participants: Participant[];
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

export type { Race, Participant, RaceWithParticipants, Bets };
export { Places, Status };
