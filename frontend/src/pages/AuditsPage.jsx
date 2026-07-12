import ResourceTable from "../components/ResourceTable";
import { resourceConfigs } from "../config/resourceConfigs";

export default function AuditsPage() {
  return <ResourceTable config={resourceConfigs.audits} />;
}