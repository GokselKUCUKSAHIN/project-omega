package com.omega.json;

public class Result
{

  private final Params params;
  private final S11 s11;
  private final double fitness;

  private Result(Params params, S11 s11, double fitness)
  {
    this.params = params;
    this.s11 = s11;
    this.fitness = fitness;
  }

  public static Result create(Params params, S11 s11, double fitness)
  {
    return new Result(params, s11, fitness);
  }


  @Override
  public String toString()
  {
    return String.format("{\"params\":%s,\"s11\":%s,\"fitness\":%s}",
        params, s11, DoubleTo.string(fitness, 7));
  }
}