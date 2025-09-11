/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'TEXT',
      primaryKey: true,
    },
    playlist_id: {
      type: 'TEXT',
      notNull: true,
    },
    user_id: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint('collaborations', 'unique_playlist_id_and_user_id', 'UNIQUE(playlist_id, user_id)');

  pgm.addConstraint(
    'collaborations',
    'fk_collaborations_playlist_id',
    'FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE'
  );

  pgm.addConstraint('collaborations', 'fk_collaborations_user_id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('collaborations');
};
