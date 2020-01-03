import Mail from '../../lib/Mail';

class HelpOrderReplyMail {
  get key() {
    return 'HelpOrderReplyMail';
  }

  async handle({ data }) {
    const { response } = data;

    await Mail.sendMail({
      to: `${response.student.name} <${response.student.email}>`,
      subject: 'Central de Ajuda',
      template: 'helporderanswer',
      context: {
        helporderid: response.id,
        student: response.student.name,
        duvida: response.question,
        resposta: response.answer,
      },
    });
  }
}

export default new HelpOrderReplyMail();
