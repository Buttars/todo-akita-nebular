import { ID, guid } from '@datorama/akita';

export interface Todo {
  id: ID;
  title: string;
  completed: boolean;
}

export const createTodo = (title: string) => {
  return {
    id: guid(),
    title,
    completed: false
  } as Todo;
};
