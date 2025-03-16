export interface ITodo {
    id: string;
    task: string;
    is_completed:boolean;
    user_id: number;
    description: string;
    category: string;
    due_date: string;
}