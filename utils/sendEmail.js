const ElasticEmail = require('@elasticemail/elasticemail-client');
const { ELASTIC_EMAIL_EMAIL_FROM, ELASTIC_EMAIL_API_KEY, FRONTEND_URL } =
  process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const apikey = defaultClient.authentications.apikey;
apikey.apiKey = ELASTIC_EMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const sendEmail = ({ userEmail, token }) => {
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(userEmail)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: 'HTML',
          Content: `<a target='_blank' href='${FRONTEND_URL}/forgot-password/${token}'>Reset password</a>`,
        }),
      ],
      Subject: 'Password recovery',
      From: ELASTIC_EMAIL_EMAIL_FROM,
    },
  });

  const callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      console.log('API called successfully.');
    }
  };

  api.emailsPost(email, callback);
};

module.exports = sendEmail;
