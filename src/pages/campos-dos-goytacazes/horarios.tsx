import Box from "@component/Box";
import AppLayout from "@component/layout/AppLayout";
import Navbar from "@component/navbar/Navbar";
import styled from "styled-components";

const ScheduleBox = styled.div`
  display: flex;
  direction: row;
  align-items: center;
  background-color: #ffffff;
`;

const ScheduleBoxDay = styled.div`
  width: 150px;
  height: 350px;
  border: solid 1px #b0b0b;
`;

const ScheduleBoxDayHeader = styled.div`
  display: flex;
  direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  background-color: #cecece;
`;

const ScheduleBoxDayHour = styled.div`
  display: flex;
  direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 1px;
`;

const ScheduleBoxDayBody = styled.div`
  display: flex;
  direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: bold;
`;

const LabelMini = styled.label`
  font-size: 11px;
  text-align: center;
  color: #b0b0b;
`;

function Horarios() {
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="500px"
      >
        <ScheduleBox>
          <ScheduleBoxDay>
            <ScheduleBoxDayHeader>
              <Label>Segunda-feira</Label>
            </ScheduleBoxDayHeader>
            <ScheduleBoxDayHour>
              <Label>07:00 - 8:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>09:30 - 11:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>17:00 - 18:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>
                Infatil, iniciantes, intermediário e avançado
              </LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>19:00 - 20:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>20:00 - 21:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
          </ScheduleBoxDay>
          <ScheduleBoxDay>
            <ScheduleBoxDayHeader>
              <Label>Terça-feira</Label>
            </ScheduleBoxDayHeader>
            <ScheduleBoxDayHour>
              <Label>07:00 - 8:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>09:30 - 11:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>17:00 - 18:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>
                Infatil, iniciantes, intermediário e avançado
              </LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>19:00 - 20:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>20:00 - 21:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
          </ScheduleBoxDay>
          <ScheduleBoxDay>
            <ScheduleBoxDayHeader>
              <Label>Quarta-feira</Label>
            </ScheduleBoxDayHeader>
            <ScheduleBoxDayHour>
              <Label>07:00 - 8:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>09:30 - 11:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>17:00 - 18:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>
                Infatil, iniciantes, intermediário e avançado
              </LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>19:00 - 20:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>20:00 - 21:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
          </ScheduleBoxDay>
          <ScheduleBoxDay>
            <ScheduleBoxDayHeader>
              <Label>Quinta-feira</Label>
            </ScheduleBoxDayHeader>
            <ScheduleBoxDayHour>
              <Label>07:00 - 8:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>09:30 - 11:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>17:00 - 18:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>
                Infatil, iniciantes, intermediário e avançado
              </LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>19:00 - 20:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>20:00 - 21:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
          </ScheduleBoxDay>
          <ScheduleBoxDay>
            <ScheduleBoxDayHeader>
              <Label>Sexta-feira</Label>
            </ScheduleBoxDayHeader>
            <ScheduleBoxDayHour>
              <Label>07:00 - 8:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>09:30 - 11:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>17:00 - 18:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>
                Infatil, iniciantes, intermediário e avançado
              </LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>19:00 - 20:00</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
            <ScheduleBoxDayHour>
              <Label>20:00 - 21:30</Label>
            </ScheduleBoxDayHour>
            <ScheduleBoxDayBody>
              <LabelMini>Iniciantes, intermediário e avançado</LabelMini>
            </ScheduleBoxDayBody>
          </ScheduleBoxDay>
        </ScheduleBox>
      </Box>
    </>
  );
}

Horarios.layout = AppLayout;
export default Horarios;
