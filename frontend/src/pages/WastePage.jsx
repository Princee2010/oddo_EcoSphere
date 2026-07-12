import ResourceTable from "../components/ResourceTable";
import { resourceConfigs } from "../config/resourceConfigs";

export default function WastePage() {
  return <ResourceTable config={resourceConfigs.waste} />;
}
