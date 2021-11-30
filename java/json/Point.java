package com.omega.json;

public class Point
{

  private final double x;
  private final double y;

  private Point(double x, double y)
  {
    this.x = x;
    this.y = y;
  }

  public static Point create(double x, double y)
  {
    return new Point(x, y);
  }

  @Override
  public String toString()
  {
    return String.format("[%s,%s]", DoubleTo.string(x, 7), DoubleTo.string(y, 7));
  }
}
