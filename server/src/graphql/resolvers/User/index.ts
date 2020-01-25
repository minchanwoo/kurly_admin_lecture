import { ProductReview } from "../../../models";

export const UserResolver = {
  email: user => "****" + user.email.slice(4),
  productReviews: async user => {
    return await ProductReview.findAll({ where: { userId: user.id } });
  },
  productReviewsCount: async user => {
    return await ProductReview.count({ where: { userId: user.id } });
  },
  createdAt: user => user.createdAt.getTime()
};
