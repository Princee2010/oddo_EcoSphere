import ResourceTable from "../components/ResourceTable";
import { resourceConfigs } from "../config/resourceConfigs";

export default function SuppliersPage() {
  return <ResourceTable config={resourceConfigs.suppliers} />;
}
