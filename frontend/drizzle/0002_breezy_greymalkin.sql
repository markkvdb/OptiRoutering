ALTER TABLE routingProblem ADD `userId` text NOT NULL REFERENCES user(id);
