import { memo } from "react";
import CompleteReportTable from "./CompleteReportTable";

const Report = memo(() => {
  return (
    <>
      <div>Relatório Completo</div>
      <CompleteReportTable/>
    </>
  );
});

export default Report;
