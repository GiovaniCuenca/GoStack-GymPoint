import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { enrollmentConfirmation } = data;

    await Mail.sendMail({
      to: `${enrollmentConfirmation.student.name} <${enrollmentConfirmation.student.email}>`,
      subject: 'Bem vindx a GYMPOINT',
      template: 'enrollment',
      context: {
        enrollmentid: enrollmentConfirmation.id,
        student: enrollmentConfirmation.student.name,
        plan: enrollmentConfirmation.plan.title,
        start: format(
          parseISO(enrollmentConfirmation.start_date),
          "'Dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end: format(
          parseISO(enrollmentConfirmation.end_date),
          "'Dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        priceTotal: enrollmentConfirmation.price,
        priceMonthly:
          enrollmentConfirmation.price / enrollmentConfirmation.plan.duration,
      },
    });
  }
}

export default new EnrollmentMail();
