export type ContainerSummary = {
  containerCount: number;
  exitedCount: number;
  runningCount: number;
  containers: ContainerDetails[]
}

export type ContainerDetails = {
  id: string;
  command: string[];
  created: number;
  status: string;
  state: "running" | "exited";
  ports: string[];
  name: string;
  image: string;
}
