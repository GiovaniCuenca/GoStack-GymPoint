import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Matrícula Cancelada',
      template: 'cancellation',
      context: {
        enrollmentid: enrollment.id,
        student: enrollment.student.name,
        plan: enrollment.plan.title,
        start: format(
          parseISO(enrollment.start_date),
          "'Dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end: format(
          parseISO(enrollment.end_date),
          "'Dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
