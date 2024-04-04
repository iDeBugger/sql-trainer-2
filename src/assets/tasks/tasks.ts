import { DatabaseId } from "../databases/databases";

export type TaskTopic = "select" | "groupBy" | "join";

export interface Task {
  id: string;
  topic: TaskTopic;
  database: DatabaseId;
  referenceSql: string;
  tables: string[];
}

export const tasksList: Task[] = [
  // Simple select *
  {
    id: "select_all_invoices",
    topic: "select",
    database: "accounting",
    referenceSql: "SELECT * FROM invoices;",
    tables: ["invoices"],
  },
  {
    id: "select_all_artists",
    topic: "select",
    database: "music",
    referenceSql: "SELECT * FROM artists;",
    tables: ["artists"],
  },
  // Select with attributes
  {
    id: "select_all_artists_names",
    topic: "select",
    database: "music",
    referenceSql: "SELECT name FROM artists;",
    tables: ["artists"],
  },
  {
    id: "select_first_and_last_name_of_employees",
    topic: "select",
    database: "accounting",
    referenceSql: "SELECT first_name, last_name FROM employees;",
    tables: ["employees"],
  },
  // Select with ordering
  {
    id: "select_employees_sorted_by_hire_date_desc",
    topic: "select",
    database: "accounting",
    referenceSql: "SELECT * FROM employees ORDER BY hire_date DESC;",
    tables: ["employees"],
  },
  {
    id: "select_first_and_last_name_of_employees_sorted_by_hire_date_asc",
    topic: "select",
    database: "accounting",
    referenceSql:
      "SELECT first_name, last_name FROM employees ORDER BY hire_date ASC;",
    tables: ["employees"],
  },
  {
    id: "select_names_and_length_of_tracks_sorted_by_names_and_milliseconds",
    topic: "select",
    database: "music",
    referenceSql:
      "SELECT name, milliseconds FROM tracks ORDER BY name ASC, milliseconds DESC;",
    tables: ["tracks"],
  },
  // Select with simple where
  {
    id: "select_employees_title_support_agent",
    topic: "select",
    database: "accounting",
    referenceSql:
      "SELECT first_name, last_name FROM employees WHERE title = 'Sales Support Agent';",
    tables: ["employees"],
  },
  // Select with where >, < and between
  {
    id: "select_tracks_bigger_than_100000000_bytes",
    topic: "select",
    database: "music",
    referenceSql: "SELECT name FROM tracks WHERE bytes > 100000000;",
    tables: ["tracks"],
  },
  {
    id: "select_tracks_smaller_than_500000_bytes",
    topic: "select",
    database: "music",
    referenceSql: "SELECT name FROM tracks WHERE bytes < 500000;",
    tables: ["tracks"],
  },
  {
    id: "select_tracks_between_500000_and_5000000_bytes",
    topic: "select",
    database: "music",
    referenceSql:
      "SELECT name FROM tracks WHERE bytes BETWEEN 500000 AND 5000000;",
    tables: ["tracks"],
  },
  // Select with dates
  {
    id: "select_employees_before_15_feb_2011",
    topic: "select",
    database: "accounting",
    referenceSql:
      "SELECT hire_date, first_name, last_name FROM employees WHERE hire_date < '2011-02-15';",
    tables: ["employees"],
  },
  // Select with LIKE
  {
    id: "select_employees_last_names_starting_with_A",
    topic: "select",
    database: "accounting",
    referenceSql: "SELECT * FROM employees WHERE last_name LIKE 'A%';",
    tables: ["employees"],
  },
  {
    id: "select_employees_first_names_ending_with_a",
    topic: "select",
    database: "accounting",
    referenceSql: "SELECT * FROM employees WHERE first_name LIKE '%a';",
    tables: ["employees"],
  },
  {
    id: "select_employees_with_address_contains_Ave",
    topic: "select",
    database: "accounting",
    referenceSql: "SELECT * FROM employees WHERE address LIKE '%Ave%';",
    tables: ["employees"],
  },
  // Select with AND and OR
  {
    id: "select_invoices_from_canada_ab",
    topic: "select",
    database: "accounting",
    referenceSql:
      "SELECT * FROM invoices WHERE billing_country = 'Canada' AND billing_state = 'AB';",
    tables: ["invoices"],
  },
  {
    id: "select_invoices_from_nv_reno_with_total_more_than_5",
    topic: "select",
    database: "accounting",
    referenceSql:
      "SELECT * FROM invoices WHERE billing_state = 'NV' AND billing_city = 'Reno' AND total > 5;",
    tables: ["invoices"],
  },
  {
    id: "select_invoices_from_states_nv_or_ab",
    topic: "select",
    database: "accounting",
    referenceSql:
      "SELECT * FROM invoices WHERE billing_state = 'NV' OR billing_state = 'AB';",
    tables: ["invoices"],
  },
  // Select with NULL
  {
    id: "select_tracks_without_composer",
    topic: "select",
    database: "music",
    referenceSql: "SELECT * FROM tracks WHERE composer IS NULL;",
    tables: ["tracks"],
  },
  {
    id: "select_customers_with_company",
    topic: "select",
    database: "accounting",
    referenceSql: "SELECT * FROM customers WHERE company IS NOT NULL;",
    tables: ["customers"],
  },
  // Select ordered tops
  {
    id: "select_invoices_germany_ordered_total_desc_limit_3",
    topic: "select",
    database: "accounting",
    referenceSql:
      "SELECT * FROM invoices WHERE billing_country = 'Germany' ORDER BY total DESC LIMIT 3;",
    tables: ["invoices"],
  },
  {
    id: "select_billing_address_invoices_ca_cupertino_ordered_total_desc_limit_3",
    topic: "select",
    database: "accounting",
    referenceSql:
      "SELECT billing_address FROM invoices WHERE billing_state = 'CA' AND billing_city = 'Cupertino' ORDER BY total DESC LIMIT 3;",
    tables: ["invoices"],
  },
  {
    id: "select_id_invoices_ca_cupertino_or_mountain_view",
    topic: "select",
    database: "accounting",
    referenceSql:
      "SELECT id FROM invoices WHERE billing_state = 'CA' AND (billing_city = 'Mountain View' OR billing_city = 'Cupertino') ORDER BY total ASC LIMIT 1;",
    tables: ["invoices"],
  },
  // Select count group by
  {
    id: "count_customers_by_country",
    topic: "groupBy",
    database: "accounting",
    referenceSql: "SELECT country, COUNT(*) FROM customers GROUP BY country;",
    tables: ["customers"],
  },
  {
    id: "count_tracks_by_unit_price",
    topic: "groupBy",
    database: "music",
    referenceSql:
      "SELECT unit_price, COUNT(*) FROM tracks GROUP BY unit_price;",
    tables: ["tracks"],
  },
  // Select count group by ordered
  {
    id: "count_tracks_by_unit_price_ordered_asc",
    topic: "groupBy",
    database: "music",
    referenceSql:
      "SELECT unit_price, COUNT(*) FROM tracks GROUP BY unit_price ORDER BY COUNT(*) ASC;",
    tables: ["tracks"],
  },
  // Select count group by ordered limited
  {
    id: "count_tracks_by_unit_price_ordered_asc_limit_1",
    topic: "groupBy",
    database: "music",
    referenceSql:
      "SELECT unit_price, COUNT(*) FROM tracks GROUP BY unit_price ORDER BY COUNT(*) ASC LIMIT 1;",
    tables: ["tracks"],
  },
  // Join
  {
    id: "join_artists_names_and_album_titles",
    topic: "join",
    database: "music",
    referenceSql:
      "SELECT artists.name, albums.title FROM artists JOIN albums ON albums.artist_id = artists.id;",
    tables: ["artists", "albums"],
  },
  {
    id: "join_album_titles_and_tracks_titles",
    topic: "join",
    database: "music",
    referenceSql:
      "SELECT albums.title, tracks.name FROM albums JOIN tracks ON tracks.album_id = albums.id;",
    tables: ["tracks", "albums"],
  },
  // Join ordered
  {
    id: "join_artists_names_and_album_titles_ordered_artists_name_desc",
    topic: "join",
    database: "music",
    referenceSql:
      "SELECT artists.name, albums.title FROM artists JOIN albums ON albums.artist_id = artists.id ORDER BY artists.name DESC;",
    tables: ["artists", "albums"],
  },
  {
    id: "join_customer_name_and_total_ordered_by_total",
    topic: "join",
    database: "accounting",
    referenceSql:
      "SELECT customers.first_name, customers.last_name, invoices.total FROM customers JOIN invoices ON customers.id = invoices.customer_id ORDER BY invoices.total DESC;",
    tables: ["customers", "invoices"],
  },
  // Join where
  {
    id: "select_all_aerosmith_albums",
    topic: "join",
    database: "music",
    referenceSql:
      "SELECT albums.title FROM albums JOIN artists ON artists.id = albums.artist_id WHERE artists.name = 'Aerosmith';",
    tables: ["albums", "artists"],
  },
  {
    id: "select_all_albums_with_midnight_track",
    topic: "join",
    database: "music",
    referenceSql:
      "SELECT albums.title FROM albums JOIN tracks ON tracks.album_id = albums.id WHERE tracks.name = 'Midnight';",
    tables: ["albums", "tracks"],
  },
  // Double join
  {
    id: "select_all_artists_with_midnight_track",
    topic: "join",
    database: "music",
    referenceSql:
      "SELECT artists.name FROM artists JOIN albums ON artists.id = albums.artist_id JOIN tracks ON tracks.album_id = albums.id WHERE tracks.name = 'Midnight';",
    tables: ["artists", "albums", "tracks"],
  },
  // Join count
  {
    id: "count_iron_maiden_albums",
    topic: "join",
    database: "music",
    referenceSql:
      "SELECT COUNT(*) FROM albums JOIN artists ON artists.id = albums.artist_id WHERE artists.name = 'Iron Maiden';",
    tables: ["artists", "albums"],
  },
  // Join group by
  {
    id: "count_each_albums_of_artists",
    topic: "join",
    database: "music",
    referenceSql:
      "SELECT artists.name, COUNT(*) FROM artists JOIN albums ON artists.id = albums.artist_id GROUP BY artists.id;",
    tables: ["artists", "albums"],
  },
  {
    id: "artist_with_max_albums",
    topic: "join",
    database: "music",
    referenceSql:
      "SELECT artists.name, COUNT(*) FROM artists JOIN albums ON artists.id = albums.artist_id GROUP BY artists.id ORDER BY COUNT(*) DESC LIMIT 1;",
    tables: ["artists", "albums"],
  },
  // Join aggregate
  {
    id: "select_top5_clients_with_most_sum_of_invoices",
    topic: "join",
    database: "accounting",
    referenceSql:
      "SELECT customers.first_name, customers.last_name, SUM(invoices.total) AS sum FROM customers JOIN invoices ON customers.id = invoices.customer_id GROUP BY customers.id ORDER BY sum DESC LIMIT 5;",
    tables: ["customers", "invoices"],
  },
];
