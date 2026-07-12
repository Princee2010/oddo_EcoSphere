import ResourceTable from "../components/ResourceTable";
import { resourceConfigs } from "../config/resourceConfigs";

export default function CarbonPage() {
  return <ResourceTable config={resourceConfigs.carbon} />;
}
