export class FetchHelpSeekers {
  static readonly type = '[Help Seekers] Fetch help seekers';

  constructor(public payload: { search?: string, isApproved?: boolean }) {}
}

export class GetHelpSeekerInformation {
  static readonly type = '[Help Seekers] Get help seeker information';

  constructor(public payload: string) {}
}

export class GetOwnHelpRequests {
  static readonly type = '[Help Seekers] Get own help requests';
}

export class GetHelpRequestInformation {
  static readonly type = '[Help Seekers] Get help request information';

  constructor(public payload: string) {}
}
