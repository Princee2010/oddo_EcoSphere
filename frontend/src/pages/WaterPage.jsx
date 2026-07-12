import ResourceTable from "../components/ResourceTable";
import { resourceConfigs } from "../config/resourceConfigs";

export default function WaterPage() {
  return <ResourceTable config={resourceConfigs.water} />;
}
