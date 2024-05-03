import { KorailSession, Schedule } from "korail-ts";
import notifee from "@notifee/react-native";
import BackgroundTimer from "react-native-background-timer";

export class KorresBackgroundService {
  constructor(
    public session: KorailSession,
    public schedules: Array<Schedule> = [],
  ) {}

  pushSchedule(schedule: Schedule) {
    this.schedules.push(schedule);
    this.restart();
  }

  private restart() {
    let count = 0;
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(() => {
      console.log("TRAIN COUNT: ", this.schedules.length);
      console.log("TRY: ", count);
      console.log("TIME: ", Date.now().toString());

      this.schedules.map(async schedule => {
        const { data } = await this.session.reserve(schedule);
        if (data.strResult === "SUCC") {
          console.log("예약 성공: ", schedule.h_trn_no);
          notifee.displayNotification({
            title: "예약 성공",
            body: `${schedule.h_trn_clsf_nm} ${schedule.h_dpt_rs_stn_nm} - ${schedule.h_arv_rs_stn_nm} ${schedule.h_dpt_tm_qb} - ${schedule.h_arv_tm_qb}`,
          });

          this.schedules = this.schedules.filter(
            s => s.h_trn_no !== schedule.h_trn_no,
          );

          this.restart();
        }
      });
    }, 5000);
  }
}
