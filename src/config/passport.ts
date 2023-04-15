import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { userService } from "../services";
import config from "./config";
import { tokenTypes } from "./tokens";


const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: CallableFunction) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = payload?.email
      ? await userService.getUserByEmail(payload?.email)
      : await userService.getUserById(payload?.id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export { jwtStrategy };
