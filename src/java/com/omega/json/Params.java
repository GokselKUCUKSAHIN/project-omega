package com.omega.json;

public class Params
{

  private final Decimal W;
  private final Decimal L;
  private final Decimal Ls;
  private final Decimal Lm;
  private final Decimal Ws;
  private final Decimal p;

  private Params(double w, double l, double ls, double lm, double ws, double p)
  {
    W = Decimal.create(w, 3);
    L = Decimal.create(l, 3);
    Ls = Decimal.create(ls, 3);
    Lm = Decimal.create(lm, 3);
    Ws = Decimal.create(ws, 3);
    this.p = Decimal.create(p, 3);
  }

  public static Params create(double w, double l, double ls, double lm, double ws, double p)
  {
    return new Params(w, l, ls, lm, ws, p);
  }

  @Override
  public String toString()
  {
    return String.format("{\"W\":%s,\"L\":%s,\"Ls\":%s,\"Lm\":%s,\"Ws\":%s,\"p\":%s}", W, L, Ls, Lm, Ws, p);
  }
}