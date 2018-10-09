export interface Task {
    readonly description: string;
    readonly to: string;
    readonly from: string;
    readonly taskId: string;
    readonly claimId: string;
}