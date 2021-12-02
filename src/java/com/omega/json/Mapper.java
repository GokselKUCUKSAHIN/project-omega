package com.omega.json;

public class Mapper
{

  public static String getJSON(int vmid, Result result)
  {
    return String.format("{\"vmid\":%d,\"result\":%s}", vmid, result);
  }
}

/*
{
  vmid: _0,
  result: {
    params: {
      W: _20.5,
      L: _30.3,
      Ls: _14.7,
      Lm: _12.1,
      Ws: _13.2,
      p: _-4.2
    },
    s11: [
      [x1, y1],
      [x2, y2],
      [x3, y3],
      [x4, y4],
      [x5, y5],
          .
          .
          .
      [xn, yn]
    ],
    fitness: _123
    }
  }
}
*/