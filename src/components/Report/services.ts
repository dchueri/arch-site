import moment, { Moment } from "moment";

export class ReportServices {
  static divideBonusPerMonth(
    commissionValue: number,
    numberOfInstallments: number
  ): number {
    const commissionPerMonth =
      Math.round((commissionValue / numberOfInstallments) * 100) / 100;
    return commissionPerMonth;
  }

  static verifyDateOfFistBonus(dealDate: string): Moment {
    const date = moment(dealDate);
    const day = date.get("date");
    const dayOfPayment = 10;
    if (day >= dayOfPayment) {
      date.add(1, "month");
      return date;
    } else {
      return date;
    }
  }

  static defineMonthsWithBonus(
    commissionValue: number,
    dealDate: string,
    numberOfInstallments: number
  ): Array<number> {
    const bonusInstallment = this.divideBonusPerMonth(
      commissionValue,
      numberOfInstallments
    );
    const bonusPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let month = this.verifyDateOfFistBonus(dealDate).get("month");
    for (let i = 0; i < numberOfInstallments; i++) {
      if (month + i > 11) {
        month -= 12;
      }
      bonusPerMonth[month + i] = bonusInstallment;
    }

    return bonusPerMonth;
  }

  static definePaymentOfMonth(bonusPerMonth: Array<number>) {
    const dayOfPayment = 10;
    const today = moment();
    if (today.date() < dayOfPayment) {
      return bonusPerMonth[today.month()];
    } else {
      if (today.month() + 1 < 12) {
        return bonusPerMonth[today.month() + 1];
      } else {
        return bonusPerMonth[today.month() - 10];
      }
    }
  }
}
