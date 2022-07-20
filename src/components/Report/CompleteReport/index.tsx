import { memo } from "react";
import CompleteReportTable from "./CompleteReportTable";

const CompleteReport = memo(() => {
  return (
    <>
      <div>Relatório Completo</div>
      <CompleteReportTable/>
    </>
  );
});

export default CompleteReport;
