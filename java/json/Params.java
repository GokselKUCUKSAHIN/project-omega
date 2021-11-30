package com.omega.json;

public class Params
{

  private final double W;
  private final double L;
  private final double Ls;
  private final double Lm;
  private final double Ws;
  private final double p;

  private Params(double w, double l, double ls, double lm, double ws, double p)
  {
    W = w;
    L = l;
    Ls = ls;
    Lm = lm;
    Ws = ws;
    this.p = p;
  }

  public static Params create(double w, double l, double ls, double lm, double ws, double p)
  {
    return new Params(w, l, ls, lm, ws, p);
  }

  @Override
  public String toString()
  {
    return String.format("{\"W\":%s,\"L\":%s,\"Ls\":%s,\"Lm\":%s,\"Ws\":%s,\"p\":%s}",
        DoubleTo.string(W, 3), DoubleTo.string(L, 3), DoubleTo.string(Ls, 3),
        DoubleTo.string(Lm, 3), DoubleTo.string(Ws, 3), DoubleTo.string(p, 3));
  }
}