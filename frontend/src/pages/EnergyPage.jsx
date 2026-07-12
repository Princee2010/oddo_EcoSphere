import ResourceTable from "../components/ResourceTable";
import { resourceConfigs } from "../config/resourceConfigs";

export default function EnergyPage() {
  return <ResourceTable config={resourceConfigs.energy} />;
}
