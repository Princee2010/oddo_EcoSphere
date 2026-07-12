import ResourceTable from "../components/ResourceTable";
import { resourceConfigs } from "../config/resourceConfigs";

export default function GoalsPage() {
  return <ResourceTable config={resourceConfigs.goals} />;
}
