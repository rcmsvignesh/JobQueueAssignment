export class Job {
    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.priority = 0;
        this.status = JobStatus.NotStarted;
    }

    id: number;
    name: string;
    description: string;
    status: JobStatus;
    priority: number;

}

export enum JobStatus {
    NotStarted="NotStarted",
    Queued="Queued",
    Running="Running",
    Done="Done"
}
