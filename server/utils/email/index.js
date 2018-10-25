const SparkPost = require('sparkpost');
const mail = new SparkPost(); // uses process.env.SPARKPOST_API_KEY
const templates = require('./tempates');

class Email {
  static async listTemplates() {
    try {
      const templates = await mail.templates.list();
      console.log(templates);
      return templates;
    } catch (err) {
      throw err;
    }
  }

  static async getTemplate(id) {
    try {
      const template = await mail.templates.get(id);
      console.log(template);
    } catch (err) {
      throw err;
    }
  }

  static async sendWithTemplate(templateName, templateConfig, emailConfig) {
    if (!templates[templateName]) {
      throw new Error('Template not found');
    }
    const template = templates[templateName];

    const html = await template(templateConfig);
    const config = {
      options: {
        sandbox: true
      },
      ...emailConfig,
      content: {
        ...emailConfig.content,
        html
      }
    };
    
    const data = await mail.transmissions.send(config);

    return data;
  }
  
  static async sendTest() {
    try {
      const data = await mail.transmissions.send({
        options: {
          sandbox: true
        },
        content: {
          from: `testing@${process.env.SPARKPOST_SANDBOX_DOMAIN}`, // 'testing@sparkpostbox.com'
          subject: 'Oh hey!',
          html:`
            <html>
              <body>
                <p>
                  Testing SparkPost - the world's most awesomest email service!
                </p>
              </body>
            </html>
          `
        },
        recipients: [
          { address: 'lucas1richard@gmail.com' }
        ]
      });
      console.log('Woohoo! You just sent your first mailing!');
      console.log(data);
    } catch (err) {
      console.log('Whoops! Something went wrong');
      console.log(err);
    }
  }
}

module.exports = Email;
