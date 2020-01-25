import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import * as dateFns from "date-fns";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { graphql } from "../../../util/graphql";

const Main = () => {
  const [users, setUsers] = useState<{ count: number; date: string }[]>([]);
  const [dateFrom, setDateFrom] = useState(dateFns.subMonths(new Date(), 1));
  const [dateTo, setDateTo] = useState(new Date());

  useEffect(() => {
    const date_from = Number(dateFns.format(dateFrom, "yyyyMMdd"));
    const date_to = Number(dateFns.format(dateTo, "yyyyMMdd"));
    graphql({
      query: `
        query($date_from: Int, $date_to: Int) {
          users(date_from: $date_from, date_to: $date_to) {
            list {
              id
              createdAt
            }
          }
        }
      `,
      variables: { date_from, date_to }
    }).then(data => {
      const users = data.users.list.map((i: any) => {
        const date = dateFns.format(new Date(i.createdAt), "yyyyMMdd");
        return { ...i, date };
      });
      const gap = dateFns.differenceInDays(dateTo, dateFrom);
      const ranges = _.range(0, gap + 1).map(i => {
        const date = dateFns.format(dateFns.addDays(dateFrom, i), "yyyyMMdd");
        const count = users.filter((user: any) => user.date === date).length;
        return { date, count };
      });
      setUsers(ranges);
    });
  }, [dateFrom, dateTo]);
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          format="MM/dd/yyyy"
          label="From"
          value={dateFrom}
          onChange={date => setDateFrom(date!)}
        />
        <KeyboardDatePicker
          variant="inline"
          format="MM/dd/yyyy"
          label="To"
          value={dateTo}
          onChange={date => setDateTo(date!)}
        />
      </MuiPickersUtilsProvider>
      <h2>사용자 가입수</h2>
      <BarChart width={800} height={400} data={users}>
        <Bar dataKey="count" fill="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </div>
  );
};

export default Main;
