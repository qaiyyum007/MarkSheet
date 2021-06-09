import jwt from "jsonwebtoken"

  export const isAuth = (req, res, next) => {
    // const token = req.headers.authorization;

    const token=req.headers.token
  
    if (token) {
      // const onlyToken = token.slice(7, token.length);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, candidate) => {
        if (err) {
          return res.status(403).send({ message: 'Invalid Token' });
        }
        req.candidate = candidate;
        next();
        return;
      });
    } else {
      return res.status(401).send({ message: 'Token is not supplied.' });
    }
  };



   export const generateToken = (candidate) => {
    return jwt.sign(
      {
        _id: candidate._id,
               
                email: candidate.email,
                name: candidate.name,
                password:candidate.password,
      },
      process.env.ACCESS_TOKEN_SECRET || 'somethingsecret',
      {
        expiresIn: '30d',
      }
    );
  };

  