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
  pgm.createTable('playlist_songs', {
    id: {
      type: 'TEXT',
      primaryKey: true,
    },
    playlist_id: {
      type: 'TEXT',
      notNull: true,
    },
    song_id: {
      type: 'TEXT',
      notNull: true,
    },
  });

  /**
   * Constraint untuk mencegah duplikasi lagu
   * di dalam playlist yang sama.
   */
  pgm.addConstraint(
    'playlist_songs',
    'unique_playlist_id_and_song_id',
    'UNIQUE(playlist_id, song_id)',
  );

  /**
   * Constraint foreign key ke tabel playlists.
   * - Jika playlist dihapus, semua lagu dalam playlist ikut terhapus.
   */
  pgm.addConstraint(
    'playlist_songs',
    'fk_playlist_songs_playlist_id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE',
  );

  /**
   * Constraint foreign key ke tabel songs.
   * - Jika lagu dihapus, lagu tersebut otomatis hilang dari semua playlist.
   */
  pgm.addConstraint(
    'playlist_songs',
    'fk_playalist_songs_song_id',
    'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE ',
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('playlist_songs');
};
