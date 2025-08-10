const CrudRepository = require("./crud-repository");

const { EmailNotification } = require("../models");
const { Enums } = require("../utils/common");
const { PENDING } = Enums.EMAIL_STATUS;


class EmailNotiRepository extends CrudRepository {
  constructor() {
    super(EmailNotification);
  }

  async getPendingEmails() {
    const response = await EmailNotification.findAll({
      where: {
        status: PENDING,
      },
    });
    return response;
  }
}

module.exports = EmailNotiRepository;
