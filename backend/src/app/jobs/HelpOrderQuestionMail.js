import Mail from '../../lib/Mail';

class HelpOrderQuestionMail {
  get key() {
    return 'HelpOrderQuestionMail';
  }

  async handle({ data }) {
    const { helpOrderConfirmation } = data;

    await Mail.sendMail({
      to: `${helpOrderConfirmation.student.name} <${helpOrderConfirmation.student.email}>`,
      subject: 'Central de Ajuda',
      template: 'helporderquestion',
      context: {
        helporderid: helpOrderConfirmation.id,
        student: helpOrderConfirmation.student.name,
        duvida: helpOrderConfirmation.question,
      },
    });
  }
}

export default new HelpOrderQuestionMail();
