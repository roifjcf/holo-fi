export type PlayMode = 'repeatOne' | 'playAll' | 'shuffle';
export interface trackInterface {
  name: string,
  url: string,
  source?: string,
  vtubers?: string[],
  release?: string,
}