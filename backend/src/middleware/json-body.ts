import express, { type RequestHandler } from 'express';

export function createJsonBodyParser(limit: number): RequestHandler {
  return express.json({ limit });
}
