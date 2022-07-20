import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { IProjectEntity } from '../../../context/ProjectProvider/types';
import { ReportServices } from '../../Report/services';

export default function MyMonthsRow(props: {project: IProjectEntity, open: boolean}) {
  const [open, setOpen] = React.useState(false);
  const project = props.project;
  const openStatus = props.open;
  const valuePerMonth = ReportServices.defineMonthsWithBonus(project.commissionValue, project.dealDate, project.numberOfInstallments)

  useEffect(() => {
    setOpen(openStatus);
  })

  return (
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Bônus
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Jan</TableCell>
                    <TableCell>Fev</TableCell>
                    <TableCell>Mar</TableCell>
                    <TableCell>Abr</TableCell>
                    <TableCell>Mai</TableCell>
                    <TableCell>Jun</TableCell>
                    <TableCell>Jul</TableCell>
                    <TableCell>Ago</TableCell>
                    <TableCell>Set</TableCell>
                    <TableCell>Out</TableCell>
                    <TableCell>Nov</TableCell>
                    <TableCell>Dez</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {valuePerMonth[0]}
                      </TableCell>
                      <TableCell>{valuePerMonth[1]}</TableCell>
                      <TableCell>{valuePerMonth[2]}</TableCell>
                      <TableCell>{valuePerMonth[3]}</TableCell>
                      <TableCell>{valuePerMonth[4]}</TableCell>
                      <TableCell>{valuePerMonth[5]}</TableCell>
                      <TableCell>{valuePerMonth[6]}</TableCell>
                      <TableCell>{valuePerMonth[7]}</TableCell>
                      <TableCell>{valuePerMonth[8]}</TableCell>
                      <TableCell>{valuePerMonth[9]}</TableCell>
                      <TableCell>{valuePerMonth[10]}</TableCell>
                      <TableCell>{valuePerMonth[11]}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
  )
}
