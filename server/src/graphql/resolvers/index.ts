import bcrypt from "bcrypt";
import { Admin, User, Product } from "../../models";
import moment from "moment";

import jwt from "jsonwebtoken";
import { UserResolver } from "./User";
import { Op } from "sequelize";

export const resolvers = {
  User: UserResolver,
  Query: {
    users: async (_, args) => {
      const { offset, limit, date_from, date_to } = args;
      const list = await User.findAll({
        order: [["ID", "DESC"]],
        ...(offset && { offset: Number(offset) }),
        ...(limit && { limit: Number(limit) }),
        ...((date_from || date_to) && {
          where: {
            createdAt: {
              ...(date_from && { [Op.gte]: moment(date_from, "YYYYMMDD") }),
              ...(date_to && { [Op.lt]: moment(date_to, "YYYYMMDD") })
            }
          }
        })
      });
      const count = await User.count();
      return { list, count };
    },
    products: async (_, args) => {
      const { offset, limit } = args;
      const list = await Product.findAll({
        order: [["ID", "DESC"]],
        offset: Number(offset),
        limit: Number(limit)
      });
      const count = await Product.count();
      return { list, count };
    },
    product: async (_, args) => {
      const { id } = args;
      const product = await Product.findOne({ where: { id } });
      return product;
    },
    user: async (_, args) => {
      const { id } = args;
      return await User.findOne({ where: { id } });
    }
  },
  Mutation: {
    login: async (_, args) => {
      const { nick, password } = args;

      try {
        const result = await Admin.findOne({ where: { nick } });
        if (!result) {
          throw new Error("존재하지 않는 아이디입니다.");
        }
        const compare = await bcrypt.compare(password, result.password);
        if (!compare) {
          throw new Error("비밀번호가 다릅니다.");
        }
        const token = jwt.sign(
          {
            id: result.id,
            nick: result.nick
          },
          "SECRET"
        );
        return token;
      } catch (e) {
        throw e;
      }
    }
  }
};
