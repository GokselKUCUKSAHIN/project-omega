package com.omega.json;

public class Demo
{

  public static void main(String[] args)
  {

    System.out.println(Mapper.getJSON(42, Result.create(Params.create(1, 2, 3, 4, 5, 6), S11.create(new double[][]{{1.3, 2.4}, {3.5, 4.6}, {5.7, 6.8}, {7.9, 8.10}, {9.11, 10.12}, {11.13, 12.14}, {13.15, 14.16}}), 420)));

  }
}
