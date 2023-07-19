export class CreateTaskDto {
  name: string;
  completed: boolean;
  categoriesIds: Array<number>;
  userId: number;
}
