import PageLayout from "../components/layouts/page-layout/page-layouts";
import ParticipantFiltered from "../components/participants/participants-filterd-list";

function ParticipantsList() {
  return (
    <PageLayout>
        <ParticipantFiltered />
    </PageLayout>
  );
}

export default ParticipantsList;
