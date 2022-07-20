import { memo } from "react";
import CompleteReportTable from "./CompleteReportTable";

const CompleteReport = memo(() => {
  return (
    <>
      <h1>Relatório Completo</h1>
      <CompleteReportTable/>
    </>
  );
});

export default CompleteReport;
