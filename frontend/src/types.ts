export type ContainerSummary = {
  containerCount: number;
  exitedCount: number;
  runningCount: number;
  containers: {
    id: string;
    command: string;
    created: number;
    status: string;
    state: "running" | "exited";
    ports: {
      PrivatePort: number;
      PublicPort: number;
      Type: string;
      IP: string;
    }[];
    names: string[];
    image: string;
  }[];
}
